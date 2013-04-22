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

    begin
      puts "\nFetch articles' urls..."
      response = Net::HTTP.get_response("govoagtz8z0u.sinaapp.com","/api/news.php")
      result = JSON.parse(response.body)
    rescue Exception => e
      puts "\nError when calling the StarupNew API."
    end

    puts "\nFetch articles..."
    30.times { Post.create } unless Post.exists?
    result[0..29].each_with_index do |post, index|
      content = fetch_content(post['link'])
      # 处理 SN 上的讨论贴
      if /^item/.match(post['link'])
        post['link'] = "http://news.dbanotes.net/#{post['link']}"
        content = "<p>本文为 Starup News 讨论贴，请访问<a href=\"#{post['link']}\">原网站</a>查看。</p>"
      end
      content.gsub!(/(?<=class=").*?container(?=.*?")/, '')
      Post.update(index + 1, :title => post['title'] ,:url => post['link'], :content => content, :points => post['points'], :comments => post['comments'])
    end
    puts "\nFinsh."
  end

end