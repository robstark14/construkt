module Api
    class ShopDrawingsController < BaseController
      before_action :authenticate_user!
  
      def add_doc
          user = {
                  user_name: current_user.first_name + ' ' + current_user.last_name,
                  enum: 'System Generated'
              }
          # puts @enum
        
        render(json: {user:user})
      end
  
      def create
        discipline_code = params[:discipline][/\(.*\)/]
        cd = ConstructionDrawing.where(discipline: params[:discipline]).count
        cd += 1
        @num_seq = cd.to_s.rjust(4,'0')
        @doc_num = 'PROJ-' + params[:register] + '-'  + discipline_code&.gsub("[()]", "") + '-' +@num_seq +  ' ' + params[:revision_number]
        
        # puts current_user.id
        # puts @sequence
        # debugger
        # file = Cloudinary::Uploader.upload(params[:attachments])
        # puts file['url']
        file = Cloudinary::Uploader.upload(params[:attachments], :folder => "Construkt/construction_drawings/", :public_id => @doc_num,)
        puts file
  
        # sequence = ConstructionDrawing.generate_new_doc_num
        # @sequence = @enum.next
        # sequence = ConstructionDrawing.doc_num
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
        # @construction_drsawing = ConstructionDrawing.create!(cd_params)
  
        render(json: @construction_drawing, status: :created) # Return 201 to client
        puts @doc_num
      end
  
     def index
        # users = User.all.order(updated_at: "DESC").map do |user|
  
      
        construction_drawings = get_matching_cds(params["search_term"]).map do |cd|
          # download = Cloudinary::Downloader.download(cd.attachments, :flags => :attachment)
          # # Create new File instance for writing in binary
          # pdf = File.new("path to file", "wb")
          # pdf.write(download)
          # pdf.close
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
    
        render(json: {construction_drawings: construction_drawings})
      end
  
      def get_matching_cds(search_term)
        if search_term.blank?
          ConstructionDrawing.all.order(discipline: "ASC")
        else
          ConstructionDrawing.where("document_number LIKE :search_term OR subject LIKE :search_term OR discipline LIKE :search_term OR document_status LIKE :search_term OR published_by LIKE :search_term", search_term: "%#{search_term}%")
        end
      end
      # private
  
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