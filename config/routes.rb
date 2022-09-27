Rails.application.routes.draw do
  # Users
  devise_for :users do
    get "/users/sign_out" => "devise/sessions#destroy", :as => :destroy_user_session
  end
  get "/api/user-role", to: "api/users#check_if_admin"
  get "/api/users", to: "api/users#index"
  get "/api/edit-user/:id", to: "api/users#edit"
  get "/api/get-user/:id", to: "api/users#get_user"
  patch "/api/update-user/:id", to: "api/users#update"
  delete "/api/delete-user/:id", to: "api/users#destroy"
  post "/api/new-user-create", to: "api/users#create"
  
  #Construction Drawings
  

  get "*path", to: "react#home"
  root 'react#home'
end
