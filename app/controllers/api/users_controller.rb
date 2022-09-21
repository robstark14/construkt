module Api
    class UsersController < BaseController
  
    #   def create
    #     place = Place.create!(
    #       name: params[:place_name],
    #       city: params[:place_city],
    #       address: params[:place_address]
    #     )
  
    #     speed = InternetSpeed.create!(
    #       place: place,
    #       download_speed: params[:download_speed],
    #       download_units: params[:download_units]
    #     )
  
    #     render(json: { }, status: :created) # Return 201 to client
    #   end
    # before_action :set_user, only: [:show, :edit, :update, :destroy]
    # before_action :verify_if_admin, only: [:index, :edit, :show, :create, :new]
  
    # # GET /users or /users.json
    # def index
    #   @users = User.where(role: "trader")
    #   @traders = @users.where(role: "trader", state: "Approved")
    # end
  
    # # GET /users/1 or /users/1.json
    # def show
    # end
  
    # # GET /users/new
    # def new
    #   @user = User.new
    # end
  
    # # GET /users/1/edit
    # def edit
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
  
    # # PATCH/PUT /users/1 or /users/1.json
    # def update
    #   respond_to do |format|
    #     if @user.update(user_params)
    #       format.html { redirect_to user_url(@user), notice: "User was successfully updated." }
    #       format.json { render :show, status: :ok, location: @user }
    #     else
    #       format.html { render :edit, status: :unprocessable_entity }
    #       format.json { render json: @user.errors, status: :unprocessable_entity }
    #     end
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