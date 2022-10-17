Rails.application.routes.draw do
  # Users
  devise_for :users
  
    devise_scope :user do
      # ..
      get '/users/sign_out' => 'devise/sessions#destroy'
    end
    # get "/users/sign_out" => "devise/sessions#destroy", :as => :destroy_user_session

  #Shop Drawings
  get "/api/user-sd", to: "api/shop_drawings#add_doc"
  get "/api/user-cd", to: "api/construction_drawings#add_doc"
  post "/api/create-sd", to: "api/shop_drawings#create"
  post "/api/create-cd", to: "api/construction_drawings#create"
  get "/api/shop-drawings", to: "api/shop_drawings#index"
  get "/api/construction-drawings", to: "api/construction_drawings#index"
  get "/api/sd/:id", to: "api/shop_drawings#show"
  get "/api/cd/:id", to: "api/construction_drawings#show"
  get "/api/cd", to: "api/construction_drawings#generate_doc_number"
  get "/api/sd", to: "api/shop_drawings#generate_doc_number"


  get "/api/user-role", to: "api/users#check_if_admin"
  get "/api/users", to: "api/users#index"
  get "/api/edit-user/:id", to: "api/users#edit"
  get "/api/get-user/:id", to: "api/users#get_user"
  patch "/api/update-user/:id", to: "api/users#update"
  delete "/api/delete-user/:id", to: "api/users#destroy"
  post "/api/new-user-create", to: "api/users#create"
  
  get "api/get_activity/:id", to: "api/workflows#get_activity"
  post "api/create-sd-activity/:id", to: "api/workflows#create_sd"
  get "api/workflow_summary/:id", to: "api/workflows#workflow_summary"



  get "*path", to: "react#home"
  root 'react#home'
end
