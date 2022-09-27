class CreateConstructionDrawings < ActiveRecord::Migration[7.0]
  def change
    create_table :construction_drawings do |t|
      t.column :register, :string, limit: 5, null:false, default: "CD"
      t.column :discipline, :string, limit: 50, null:false
      t.column :location, :string, limit: 50, null:false
      t.column :document_status, :string, limit: 50, null:false, default: "DRAFT"
      t.column :package, :string, limit: 5 ,default: ""
      t.column :published_by, :string, default: "", null:false
      t.column :published_by_id, :string, default: "", null:false
      t.column :subject, :string, default: "" , null:false
      t.column :revision_number, :string, default: "" , null:false
      t.column :company_to, :string, default: "" 
      t.column :company_from, :string, default: "" 

      t.timestamps
    end
  end
end
