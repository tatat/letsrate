class RaterController < ApplicationController 
  
  def create                                
    if current_user.present?
      obj = klass_param.classify.constantize.find(id_param)
      if params[:dimension].present?
        obj.rate score_param.to_i, current_user.id, "#{params[:dimension]}"       
      else
        obj.rate score_param.to_i, current_user.id 
      end
      
      render :json => true 
    else
      render :json => false        
    end
  end                                        
  
  protected

  [:id, :klass, :score, :dimension].each do |param|
    if defined? StrongParameters
      define_method :"#{param}_param" do
        params.require(param)
      end
    else
      define_method :"#{param}_param" do
        params[param]
      end
    end
  end
  
end