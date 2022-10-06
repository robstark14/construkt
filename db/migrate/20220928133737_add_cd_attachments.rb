class AddCdAttachments < ActiveRecord::Migration[7.0]
  def change
    add_column :construction_drawings, :attachments, :string
  end
end
