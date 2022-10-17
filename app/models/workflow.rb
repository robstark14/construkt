class Workflow < ApplicationRecord
    belongs_to :shop_drawing, optional: true
    # belongs_to :construction_drawing

end
