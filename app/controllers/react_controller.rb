class ReactController < ApplicationController
  before_action :authenticate_user!

    def home # Returns the react root app
      render "pages/react_app"
    end
  end