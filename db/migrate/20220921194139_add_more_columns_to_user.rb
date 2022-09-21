class AddMoreColumnsToUser < ActiveRecord::Migration[7.0]
  def change
    change_table(:users) do |t|
      t.column :first_name, :string, limit: 50, null:false
      t.column :last_name, :string, limit: 50, null:false
      t.column :role, :string, limit: 50, null:false
      t.column :company_name, :string, limit: 100, null:false
      t.column :package, :string, limit: 5
      t.column :open_items_count, :integer, default: 0
    
    end
  end
end
