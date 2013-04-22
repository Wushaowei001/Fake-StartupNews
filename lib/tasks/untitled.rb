# encoding: utf-8
post = Hash.new
post['link'] = "item?id=4142"

if /^item/.match(post['link'])
  p post['link'] = "http://news.dbanotes.net/#{post['link']}"
  p post['content'] = "<p>本文为 Starup News 讨论贴，请访问<a href=\"#{post['link']}\">原网站</a>查看。</p>"
  p post['title'] = "讨论贴：#{post['title']}"
end
