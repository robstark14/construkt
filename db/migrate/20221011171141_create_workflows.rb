class CreateWorkflows < ActiveRecord::Migration[7.0]
  def change
    create_table :workflows do |t|
      t.string :addressed_to, null:false
      t.string :cc_to, null:false
      t.string :current_activity_owner, null:false
      t.string :next_activity_owner, null:false
      t.string :published_by, default: "", null:false
      t.string :published_by_id, default: "", null:false
      t.string :activity_subject, default: "" , null:false
      t.text :outcome, default: "" , null:false
      t.text :activity_remarks, default: "" , null:false
      t.string :attachments
      t.datetime :workflow_deadline, default: DateTime.now + 3.days , null:false
      
      t.timestamps
    end
  end
end
