class AddUuidAsUserIndex < ActiveRecord::Migration[7.0]
  def change
    add_index :users, :id, :unique => true
  end
end
