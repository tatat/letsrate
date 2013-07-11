module Letsrate
  module Helpers
    def rating_for(rateable_obj, dimension=nil, options={})
      options.reverse_merge!(
        :star               => 5,
        :disable_after_rate => false,
        :readonly           => nil,
      )

      klass    = rateable_obj.average(dimension)
      avg      = klass.nil? ? 0 : klass.avg
      readonly = false

      if options[:disable_after_rate]
        readonly = unless options[:readonly].nil?
                     !! options[:readonly]
                   else
                     current_user.present? ?
                      !rateable_obj.can_rate?(current_user.id, dimension) :
                      true
                   end
      end

      content_tag :div, '', :class => "star",
                            :data  => {
                              :dimension            => dimension.to_s,
                              :rating               => avg,
                              :id                   => rateable_obj.id,
                              :classname            => rateable_obj.class.name,
                              :"disable-after-rate" => options[:disable_after_rate],
                              :readonly             => readonly,
                              :"star-count"         => options[:star],
                            }
    end
  end
end

ActionView::Base.__send__ :include, Letsrate::Helpers
