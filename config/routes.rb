Rails.application.routes.draw do
  root 'react#home'
  devise_for :users 
  # do
  #   get "/users/sign_out" => "devise/sessions#destroy", :as => :destroy_user_session
  # end
   
  resources :users
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
