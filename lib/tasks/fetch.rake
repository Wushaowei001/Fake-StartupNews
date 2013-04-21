# encoding: utf-8
namespace :fetch do

  desc "Fetch articles"
  task :posts => :environment do
    require 'rubygems'
    require 'net/http'
    require 'json'

    def fetch_content(url)
      uri = URI('https://www.readability.com/api/content/v1/parser')
      params = { :url => url,
                 :token => "7f7d96514ae83cde3a609a439b15a33b1be03afc" }
      uri.query = URI.encode_www_form(params)
      http = Net::HTTP.new(uri.host, uri.port)
      http.use_ssl = true
      http.verify_mode = OpenSSL::SSL::VERIFY_NONE

      request = Net::HTTP::Get.new(uri.request_uri)

      response = http.request(request)
      JSON.parse(response.body)['content']
    end

    puts "Fetch articles' urls..."
    response = Net::HTTP.get_response("govoagtz8z0u.sinaapp.com","/api/news.php")
    result = JSON.parse(response.body)
    Post.destroy_all
    puts "Fetch articles..."
    result[0..29].each do |post|
      content = fetch_content(post['link'])
      Post.create(:title => post['title'] ,:url => post['link'], :content => content, :points => post['points'])
    end
    puts "Finsh."
  end

  desc "This task is called by the Heroku cron add-on"
  task :cron => :environment do
    if Time.now.hour % 4 == 0 # run every four hours
      puts "Cron..."
      Rake::Task["fetch:posts"].invoke
      puts "done."
    end
  end
end