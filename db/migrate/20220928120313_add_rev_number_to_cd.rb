class AddRevNumberToCd < ActiveRecord::Migration[7.0]
  def change
    add_column :construction_drawings, :revision_number, :integer, null:false
  end
end
