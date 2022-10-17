module Api
  class ShopDrawingsController < BaseController
    before_action :authenticate_user!
    # after_action :generate_doc_number, only: [:create]

    def add_doc
      user = {user_name: current_user.first_name + ' ' + current_user.last_name,
              enum: 'System Generated',
              register: 'SD',
              company: current_user.company_name,
              
            }
      render(json: {user: user})
    end

    def create

      discipline_code = params[:discipline][/\(.*\)/]
      sd = ShopDrawing.where(discipline: params[:discipline]).count
      sd += 1
      @num_seq = sd.to_s.rjust(4,'0')
      @doc_num = 'PROJ-' + params[:register] + '-'  + discipline_code&.gsub("[()]", "").to_s + '-' +@num_seq +  '-' + params[:revision_number]

      file = Cloudinary::Uploader.upload(params[:attachments], :folder => "Construkt/shop_drawings/", :public_id => @doc_num,)
    

      @shop_drawing = ShopDrawing.create!(
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
          required_response_date: params[:deadline]

      
      )
     

      render(json: @shop_drawing, status: :created) # Return 201 to client
      puts @doc_num
    end

    def generate_doc_number
      # doc_number = @doc_num
      doc_number = ShopDrawing.all.last.document_number
      puts doc_number
      puts doc_number.class

      render(json: {doc_number:doc_number})
    end

    def index

      shop_drawings = get_matching_sds(params["search_term"]).map do |sd|

        {
          document_number: sd.document_number,
          document_status: sd.document_status,
          register: sd.register,
          location: sd.location,
          subject: sd.subject,
          remarks: sd.remarks,
          revision_number: sd.revision_number,
          discipline: sd.discipline,
          company_from: sd.company_from,
          published_by: sd.published_by,
          published_by_id: current_user.id,
          created: sd.created_at.strftime("%B %d, %Y"),
          last_updated: sd.updated_at.strftime("%B %d, %Y"), 
          attachments: sd.attachments,  
          required_response_date: sd.required_response_date   

        }
      end
  
      render(json: {drawings: shop_drawings})
    end

    def show
      shop_drawing = ShopDrawing.where(document_number: params[:id])
      puts shop_drawing

      render(json: {drawing: shop_drawing})
    end

    private
    def get_matching_sds(search_term)
      if search_term.blank?
        ShopDrawing.all.order(discipline: "ASC")
      else
        ShopDrawing.where("document_number LIKE :search_term OR subject LIKE :search_term OR discipline LIKE :search_term OR document_status LIKE :search_term OR published_by LIKE :search_term", search_term: "%#{search_term}%")
      end
    end

  end
end