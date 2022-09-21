# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
User.create(
    email: ENV['ADMIN_EMAIL'], 
    password: ENV['ADMIN_PASS'], 
    first_name: "Rob",
    last_name: "Pajarin",
    password_confirmation: ENV['ADMIN_PASS_CONFIRM'], 
    company_name: "admin",
    role: 'admin',
)