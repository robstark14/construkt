module Api
    class WorkflowsController < BaseController
      before_action :authenticate_user!

      # def create
      #   @workflow = Workflow.create!(
      #       addressed_to: ,cc_to: ,current_activity_owner: , next_activity_owner: , published_by: , published_by_id: ,activity_subject: , outcome: , activity_remarks: , attachments: ,  workflow_deadline: , created_at: , updated_at: 
        
      #   )
  
  
      #   render(json: @construction_drawing, status: :created) # Return 201 to client
      # end
      def get_activity
        activity ={
            1 => 'DC to Receive and Check Submissions',
            2 => 'Project/Package Manager to Review Submission',
            3 => 'MEPF Consultant to Review',
            4 => 'Structural Consultant to Review',
            5 => 'Architect on Record to Comment and Consolidate',
            6 => 'Project/Package Manager to Review Submission',
            7 => 'DC to Disribute to Contractor'
        }

        outcome ={
          1 => 'Reviewed and Approved',
          2 => 'Revise and Resubmit',
          3 => 'Return to the Contractor'
        }
       @document = ShopDrawing.where(document_number: params[:id])[0]
        # puts document.id
        previous_workflow = Workflow.where(shop_drawings_id: @document['id'])[0]

        puts 'hello'
        puts @document
        puts @document.class
        puts @document['required_response_date']
        puts @document['id']
        puts @document['id'].class


        puts 'hello'
        
        puts 'gege'
        puts previous_workflow
        puts previous_workflow.class
        puts previous_workflow['next_activity_owner']
        puts previous_workflow['next_activity_owner'].class
        puts 'gege'

        # document = activity[@document[0]['workflow_stage'].to_i]
        if @document['workflow_stage'] == 0

          document = {
            activity: activity[1],
            workflow_stage: 0 
          }

        else
          document = {
            activity: activity[@document['workflow_stage'].to_i],
            next_activity_owner: previous_workflow['next_activity_owner'],
            next_activity: activity[@document['workflow_stage'].to_i + 1],
            workflow_stage: @document['workflow_stage'] 
          }
        end
        

        render(json: {document: document}, status: :ok)


        
      end

      def create_sd
        document = ShopDrawing.where(document_number: params[:id])[0]

                   
        @workflow = Workflow.create!(
          current_activity_owner: params[:current_activity_owner],
          next_activity_owner: params[:next_activity_owner], 
          activity_subject: params[:activity_subject],
          outcome: params[:outcome], 
          activity_remarks: params[:activity_remarks],
          attachments: params[:attachments],
          workflow_deadline: document['required_response_date'], 
          shop_drawings_id: document['id']
        )

        document['workflow_stage'] += 1
        document.save!

        render(json: @workflow, status: :created) # Return 201 to client
  
      end
  
      def workflow_summary
        # users = User.all.order(updated_at: "DESC").map do |user|
        sd = ShopDrawing.where(document_number: params[:id])[0]

        workflow = Workflow.where(shop_drawings_id: sd['id'])
          # {
          #   id: user.id,
          #   email: user.email,
          #   first_name: user.first_name,
          #   last_name: user.last_name,
          #   role: user.role,
          #   company: user.company_name,
          #   package: user.package,
          #   created: user.created_at.strftime("%B %d, %Y"),
          #   last_updated: user.updated_at.strftime("%B %d, %Y"),
          #   open_items: user.open_items_count
  
          # }
        render(json: workflow, status: :ok) # Return 201 to client

      end
  
      #   render(json: {users: users})
      # end
      
  
      # def get_matching_users(search_term)
      #   if search_term.blank?
      #     User.all.order(updated_at: "DESC")
      #   else
      #     User.where("first_name LIKE :search_term OR last_name LIKE :search_term OR company_name LIKE :search_term OR role LIKE :search_term", search_term: "%#{search_term}%")
      #   end
      # end
    end
end