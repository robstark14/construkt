class AddDocNumberToConstructionDrawings < ActiveRecord::Migration[7.0]
  def change
    add_column :construction_drawings, :document_number, :string, index:true
  end
end
