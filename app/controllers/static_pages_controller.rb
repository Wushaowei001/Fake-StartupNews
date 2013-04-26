class StaticPagesController < ApplicationController
  def home
    @posts = Post.find(:all, :order => 'id')
    @post = Post.find(1)
  end

  def about
  end

  def show
    @post = Post.find(params[:id])

    respond_to do |format|
      format.html { render :layout => false }  # show.html.erb
    end
  end
end
