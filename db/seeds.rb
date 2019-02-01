# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
AdminUser.create!(email: 'admin2@example.com', password: 'password', password_confirmation: 'password')


courses = Course.create( [
  { title: "Call mum",
    description: "Call mum to take some news",
    capacity: 1,
    liked: false },
  { title: "Part I ",
    description: "Finish part I essay",
    capacity: 3,
    liked: false },
  { title: "Arg part II",
    description: "Finish part II",
    capacity: 1,
    liked: false },
  { title: "Swedish Fit",
    description: "Go to swedish Fit ",
    capacity: 2,
    liked: false }
    ])



anna = User.create( email: "anna@anna.com", password: "password", password_confirmation: "password")
