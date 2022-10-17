# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2022_10_17_022038) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pgcrypto"
  enable_extension "plpgsql"

  create_table "construction_drawings", force: :cascade do |t|
    t.string "register", limit: 5, default: "CD", null: false
    t.string "discipline", limit: 50, null: false
    t.string "location", limit: 50, null: false
    t.string "document_status", limit: 50, default: "DRAFT", null: false
    t.string "package", limit: 5, default: ""
    t.string "published_by", default: "", null: false
    t.string "published_by_id", default: "", null: false
    t.string "subject", default: "", null: false
    t.string "company_to", default: ""
    t.string "company_from", default: ""
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "document_number"
    t.integer "revision_number", null: false
    t.string "attachments"
    t.text "remarks"
    t.index ["document_number"], name: "index_construction_drawings_on_document_number"
  end

  create_table "shop_drawings", force: :cascade do |t|
    t.string "document_number"
    t.string "register", limit: 5, default: "SD", null: false
    t.string "discipline", limit: 50, null: false
    t.string "location", limit: 50, null: false
    t.string "document_status", limit: 50, default: "DRAFT", null: false
    t.string "package", limit: 5, default: ""
    t.string "published_by", default: "", null: false
    t.string "published_by_id", default: "", null: false
    t.string "subject", default: "", null: false
    t.text "remarks"
    t.text "text"
    t.integer "revision_number", default: 0, null: false
    t.string "company_to", default: "", null: false
    t.string "company_from", default: "", null: false
    t.string "attachments"
    t.datetime "required_response_date", default: "2022-10-23 09:42:45", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "workflow_stage", default: 0
    t.index ["document_number"], name: "index_shop_drawings_on_document_number", unique: true
  end

  create_table "users", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.bigint "integer_id"
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "first_name", limit: 50, null: false
    t.string "last_name", limit: 50, null: false
    t.string "role", limit: 50, null: false
    t.string "company_name", limit: 100, null: false
    t.string "package", limit: 5
    t.integer "open_items_count", default: 0
    t.index ["id"], name: "index_users_on_id", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  create_table "workflows", force: :cascade do |t|
    t.string "current_activity_owner", null: false
    t.string "next_activity_owner", null: false
    t.string "activity_subject", default: "", null: false
    t.text "outcome", default: "", null: false
    t.text "activity_remarks", default: "", null: false
    t.string "attachments"
    t.datetime "workflow_deadline", default: "2022-10-19 09:42:45", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "shop_drawings_id", null: false
    t.index ["shop_drawings_id"], name: "index_workflows_on_shop_drawings_id"
  end

  add_foreign_key "workflows", "shop_drawings", column: "shop_drawings_id"
end
