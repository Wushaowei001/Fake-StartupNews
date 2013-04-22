class Post < ActiveRecord::Base
  attr_accessible :comments, :content, :points, :title, :url
end
