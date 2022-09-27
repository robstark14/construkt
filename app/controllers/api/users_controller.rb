module Api
  class UsersController < BaseController
  # respond_to :json
  before_action :user_params
  # before_action :verify_if_admin, only: [:index, :edit, :show, :create, :new]


  # # GET /users or /users.json
  def index
    # users = User.all.order(updated_at: "DESC").map do |user|
    users = get_matching_users(params["search_term"]).map do |user|
      {
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        role: user.role,
        company: user.company_name,
        package: user.package,
        created: user.created_at.strftime("%B %d, %Y"),
        last_updated: user.updated_at.strftime("%B %d, %Y"),
        open_items: user.open_items_count

      }
    end

    render(json: {users: users})
  end
  

  def get_matching_users(search_term)
    if search_term.blank?
      User.all.order(updated_at: "DESC")
    else
      User.where("first_name LIKE :search_term OR last_name LIKE :search_term OR company_name LIKE :search_term OR role LIKE :search_term", search_term: "%#{search_term}%")
    end
  end

  def create
    User.create!(
      first_name: params[:first_name],
      last_name: params[:last_name],
      email: params[:email],
      password: params[:password],
      role: params[:role],
      company_name: params[:company],
      package: params[:package]
    )
    render(json: { }, status: :created) # Return 201 to client
  end

  # GET /users/1/edit
  def edit
    puts params
    user = User.find(params[:id])
    render(json: {user: user})
  end

  # # PATCH/PUT /users/1 or /users/1.json
  def update
    user = User.find(params[:id])
    user.update!(
    first_name: params[:first_name],
    last_name: params[:last_name],
    email: params[:email],
    password: params[:password],
    role: params[:role],
    company_name: params[:company],
    package: params[:package]
  )
   render(json: { }) # Return 201 to client
  end

  def destroy
    user = User.find(params[:id])
    user.destroy!
  #  render(json: { }) # Return 201 to client
  end
  
  def get_user
    puts params
    user = User.find(params[:id])
    render(json: {user: user})
  end

  def check_if_admin
      user_role = current_user.role

      render(json: {user_role: user_role})
  end
  private
  def user_params
    params.permit(:id, :email, :password, :password, :first_name, :last_name, :company_name, :role, :package, :search_term)
  end


  # # GET /users/1 or /users/1.json
  # def show
  # end

  # # GET /users/new
  # def new
  #   render 'pages/react_app'
  # end


  # # POST /users or /users.json
  # def create
  #   @user = User.new(user_params)
  #   @user.state = "Approved"
  #   @user.skip_confirmation!
  #   if @user.save
  #     redirect_to @user, notice: 'New trader was has been created successfully.'
  #   else
  #     render :new
  #   end

  # end


  # # DELETE /users/1 or /users/1.json
  # def destroy
  #   @user.destroy
  #   redirect_to users_path, notice: "You successfully deleted #{@user.email}'s profile."
  # end

  # private
  #   # Use callbacks to share common setup or constraints between actions.
  #   def set_user
  #     @user = User.find(params[:id])
  #   end

  #   # Only allow a list of trusted parameters through.
  #   def user_params
  #     # params.fetch(:user, {})
  #     params.require(:user).permit(:email, :password, :password_confirmation)
  #   end

  #   def verify_if_admin
  #     if current_user.role == 'admin'
  #        return
  #     else
  #        redirect_to root_path, notice: "You must be an admin to perform this action."
  #     end
  #   end
  end
end