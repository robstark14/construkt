class MakeDocNumberIndex < ActiveRecord::Migration[7.0]
  def change
    add_index :construction_drawings, :document_number
  end
end
