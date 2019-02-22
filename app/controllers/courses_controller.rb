class CoursesController < ApiController
     before_action :authenticate_user

     def index
      @courses = Course.where(user: current_user).order("created_at DESC")
      render json: @courses
    end


    def create

    @course = Course.create(course_params)
    @course.user = current_user
    render json: @course
   end


  #  def update
  #   course = Course.find(params[:id])
  #  course.update(course_params)
  #   if course.save
  #     render json: {
  #       message: 'ok',
  #       course: course
  #     }
  #     redirect_to courses_path
  #   else
  #     render json: {
  #       message: 'Could not update the task :('
  #     }
  #   end
  # end

   def update
    @course = Course.find(params[:id])
    @course.update_attributes(course_params)
    render :json
   end


  def destroy
  @course = Course.find(params[:id])
  if @course.destroy
    head :no_content, status: :ok
  else
    render json: @course.errors, status: :unprocessable_entity
  end
end

   private

  def course_params
    params.require(:course).permit(:id, :title, :description, :capacity, :address, :liked, :category, :user_id)
  end

end

