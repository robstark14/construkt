class FilesUploader < CarrierWave::Uploader::Base
    include Cloudinary::CarrierWave 
    include CarrierWave::RMagick
end