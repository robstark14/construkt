class AddWorkflowCountToSd < ActiveRecord::Migration[7.0]
  def change
    add_column :shop_drawings, :workflow_stage, :integer, default: 0
  end
end
