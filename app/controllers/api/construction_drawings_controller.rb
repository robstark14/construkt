module Api
  class ConstructionDrawingsController < BaseController
    before_action :authenticate_user!
    # after_action :initialize_doc_number, only: [:create]
    # after_action :generate_doc_number, only: [:initialize_doc_number]


 
    def add_doc
        @user = {user_name: current_user.first_name + ' ' + current_user.last_name,
                enum: 'System Generated',
                register: 'CD',
                company: current_user.company_name,
              
              }
      render(json: {user:@user})
    end

    def create
      discipline_code = params[:discipline][/\(.*\)/]
      puts discipline_code
      cd = ConstructionDrawing.where(discipline: params[:discipline]).count
      cd += 1
      @num_seq = cd.to_s.rjust(4,'0')
      @doc_num = 'PROJ-' + params[:register] + '-'  + discipline_code&.gsub("[()]", "").to_s + '-' +@num_seq +  '-' + params[:revision_number]

      file = Cloudinary::Uploader.upload(params[:attachments], :folder => "Construkt/shop_drawings/", :public_id => @doc_num,)
    
      
      @construction_drawing = ConstructionDrawing.create!(
          document_number: @doc_num,
          document_status: params[:document_status],
          subject: params[:subject],
          remarks: params[:remarks],
          register: params[:register],
          location: params[:location],
          revision_number: params[:revision_number].to_i,
          discipline: params[:discipline],
          company_from: params[:company_from],
          published_by: params[:published_by],
          published_by_id: current_user.id,
          # created_at: params[:created_at],
          attachments: file["url"],
      
      )


      render(json: @construction_drawing, status: :created) # Return 201 to client
    end

    def generate_doc_number
      # doc_number = @doc_num
      doc_number = ConstructionDrawing.all.last.document_number
      puts doc_number
      puts doc_number.class

      render(json: {doc_number:doc_number})
    end

    def index
  
      construction_drawings = get_matching_cds(params["search_term"]).map do |cd|
        {
          document_number: cd.document_number,
          document_status: cd.document_status,
          register: cd.register,
          location: cd.location,
          subject: cd.subject,
          remarks: cd.remarks,
          revision_number: cd.revision_number,
          discipline: cd.discipline,
          company_from: cd.company_from,
          published_by: cd.published_by,
          published_by_id: current_user.id,
          created: cd.created_at.strftime("%B %d, %Y"),
          last_updated: cd.updated_at.strftime("%B %d, %Y"), 
          attachments: cd.attachments   
        }
      end

      render(json: {drawings: construction_drawings})
    end

    def show
      cd_drawing = ConstructionDrawing.where(document_number: params[:id])  
      puts cd_drawing

      # cd_drawing.each do |sd|
      #   {
      #     document_number: sd.document_number,
      #     document_status: sd.document_status,
      #     register: sd.register,
      #     location: sd.location,
      #     subject: sd.subject,
      #     remarks: sd.remarks,
      #     revision_number: sd.revision_number,
      #     discipline: sd.discipline,
      #     company_from: sd.company_from,
      #     published_by: sd.published_by,
      #     published_by_id: current_user.id,
      #     created: sd.created_at.strftime("%B %d, %Y"),
      #     last_updated: sd.updated_at.strftime("%B %d, %Y"), 
      #     attachments: sd.attachments   
      #   }
      # end
  
      render(json: {drawing: cd_drawing})
    end
    
    
    private
    def get_matching_cds(search_term)
      if search_term.blank?
        ConstructionDrawing.all.order(discipline: "ASC")
      else
        ConstructionDrawing.where("document_number LIKE :search_term OR subject LIKE :search_term OR discipline LIKE :search_term OR document_status LIKE :search_term OR published_by LIKE :search_term", search_term: "%#{search_term}%")
      end
    end

    # def cd_params
    #   params.permit(
    #       :document_number,
    #       :document_status,
    #       :subject,
    #       :register,
    #       :location,
    #       :revision_number,
    #       :discipline,
    #       :company_from,
    #       :published_by,
    #       :published_by_id,
    #       :created_at,
    #       :attachments
    #   )
    # end
  end
end