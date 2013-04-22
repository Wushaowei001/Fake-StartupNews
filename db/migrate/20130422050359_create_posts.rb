class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.string :title
      t.text :content
      t.string :url
      t.integer :points
      t.string :comments

      t.timestamps
    end
  end
end
