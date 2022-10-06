class ChangeRevisionNumberType < ActiveRecord::Migration[7.0]
  def change
    remove_column :construction_drawings, :revision_number
  end
end
