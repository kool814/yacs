FactoryGirl.define do
  factory :department do
    sequence(:code) { |n| "DEPT#{n}" }
    sequence(:name) { |n| "Department #{n}" }
  end

  factory :course do
    sequence(:name)   { |n| "Course #{n}" }
    sequence(:number) { |n| 1000 + n }
    min_credits   4
    max_credits   4
    department
  end

  factory :section do
    name        '1'
    crn         11111
    seats       10
    seats_taken 5
    course
  end

  factory :professor do
    name 'John Doe'
  end

  factory :semester do
    season 'Fall 2015'
  end

  factory :period do
    section_id '1'
    time '4PM-6PM Tuesday'
    period_type 'Lecture'
    location 'DCC 318'
  end

  factory :periods_professor do
    period
    professor
  end
end
