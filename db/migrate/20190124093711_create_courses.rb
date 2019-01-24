class CreateCourses < ActiveRecord::Migration[5.2]
  def change
    create_table :courses do |t|
      t.string :title
      t.string :description
      t.integer :capacity
      t.string :category
      t.boolean :liked
      t.datetime :date

      t.timestamps
    end
  end
end
