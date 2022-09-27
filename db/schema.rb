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

ActiveRecord::Schema[7.0].define(version: 2022_09_27_201315) do
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
    t.string "revision_number", default: "", null: false
    t.string "company_to", default: ""
    t.string "company_from", default: ""
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
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

end
