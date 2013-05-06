class StaticPagesController < ApplicationController
  # Todo 重用
  def home
    @posts = Post.find(:all, :order => 'id')
    @post = Post.find(1)
  end

  def about
    if request.headers['X-PJAX']
      render :layout => false
    else
      @posts = Post.find(:all, :order => 'id')
    end
  end

  def show
    @post = Post.find(params[:id])

    if request.headers['X-PJAX']
      render :layout => false
    else
      @posts = Post.find(:all, :order => 'id')
    end

  end
end
