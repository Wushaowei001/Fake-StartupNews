class StaticPagesController < ApplicationController
  # Todo 重用
  def about
    if request.headers['X-PJAX']
      render :layout => false
    else
      @posts = Post.find(:all, :order => 'id')
    end
  end

  def show
    params[:id] = 1 if params[:id].nil?
    @post = Post.find(params[:id])

    if request.headers['X-PJAX']
      render :layout => false
    else
      @posts = Post.find(:all, :order => 'id')
    end

  end
end
