class StaticPagesController < ApplicationController
  # Todo 重用
  def home
    @posts = Post.find(:all, :order => 'id')
    @post = Post.find(1)
    if request.headers['X-PJAX']
      render :layout => false
    end
  end

  def about
    @posts = Post.find(:all, :order => 'id')

    if request.headers['X-PJAX']
      render :layout => false
    end
  end

  def show
    @posts = Post.find(:all, :order => 'id')
    @post = Post.find(params[:id])

    if request.headers['X-PJAX']
      render :layout => false
    end
  end
end
