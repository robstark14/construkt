class API::V1::SessionsController < Devise::SessionsController
    include CurrentUserConcern

  def create
    user = User.find_by(email: params["user"]["email"]).try(:authenticate, params["user"]["password"])

    if user
      session[:user_id] = user.id 
      render json: {
        status: :created,
        logged_in: true,
        user: user
      }
    else
      render json: { status: 401 }
    end
  end

  def logged_in
    if @current_user
      render json: {
        logged_in: true,
        user: @current_user
      }
    else
      render json: {
        logged_in: false
      }
    end
  end

  def logout
    reset_session
    render json: { 
      status: 200, 
      logged_out: true 
    }
  end
    # def create
    #   @user = User.find_by_email(user_params[:email])
    #   if @user && @user.valid_password?(user_params[:password])
    #     session[:user_id]=@user.id
    #     sign_in :user, @user
    #     render json: @user
    #   elsif @user && not(@user.valid_password?(user_params[:password]))
    #     invalid_attempt
    #   else
    #     no_user
    #   end
    # end
  
  
  
    #  def destroy
    #   puts "logout clicked"
    #   @user = User.find_by_email(user_params[:email])
    #   if @user.valid_password(user_params[:password]) && @user.destroy
    #     render :json => { success: "user was successfully deleted" }, :status => 201
    #   else
    #     render :json => { error: "user could not be deleted" }, :status => 422
    #   end
    # end
  
    # private
  
    # def no_user
    #   render json: {error: "An account with this email doesn't exist. Please create a new one"}, status: :unprocessable_entity
    # end
  
    # def invalid_attempt
    #   render json: { error: "Your password isn't correct" }, status: :unprocessable_entity
    # end
  
    # def user_params
    #   params.require(:user).permit(:email, :password)
    # end
    end
  