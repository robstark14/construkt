class RemoveForeignKeyFromSd < ActiveRecord::Migration[7.0]
  def change
    remove_column :workflows, :shop_drawing_id # remove existing primary key
  end
end
