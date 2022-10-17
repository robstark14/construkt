class Remove < ActiveRecord::Migration[7.0]
  def change
    remove_column :workflows, :addressed_to
    remove_column :workflows, :cc_to
    remove_column :workflows, :published_by
    remove_column :workflows, :published_by_id
  end
end
