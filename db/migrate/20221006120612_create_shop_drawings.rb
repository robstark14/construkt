class CreateShopDrawings < ActiveRecord::Migration[7.0]
  def change
    create_table :shop_drawings do |t|
      t.string :document_number
      t.string :register, limit: 5, null:false, default: "SD"
      t.string :discipline, limit: 50, null:false
      t.string :location, limit: 50, null:false
      t.string :document_status, limit: 50, null:false, default: "DRAFT"
      t.string :package, limit: 5 ,default: ""
      t.string :published_by, default: "", null:false
      t.string :published_by_id, default: "", null:false
      t.string :subject, default: "" , null:false
      t.text   :remarks, :text, limit:500
      t.integer :revision_number, default: 0 , null:false
      t.string :company_to, default: "" , null:false
      t.string :company_from, default: "" , null:false
      t.string :attachments
      t.datetime :required_response_date, default: DateTime.now + 7.days , null:false
      
      t.index :document_number, unique: true
      t.timestamps
    end
  end
end
