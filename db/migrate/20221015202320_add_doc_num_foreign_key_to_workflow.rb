class AddDocNumForeignKeyToWorkflow < ActiveRecord::Migration[7.0]
  def change
    add_reference :workflows, :shop_drawing, null: false, foreign_key: true

  end
end
