Rails.application.routes.draw do
  devise_for :users 
  # do
  #   get "/users/sign_out" => "devise/sessions#destroy", :as => :destroy_user_session
  # end
  get "/api/users", to: "api/users#index"
  get "*path", to: "react#home"
  root 'react#home'
end
