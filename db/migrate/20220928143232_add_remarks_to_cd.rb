class AddRemarksToCd < ActiveRecord::Migration[7.0]
  def change
    add_column :construction_drawings, :remarks, :text, limit:500
  end
end
