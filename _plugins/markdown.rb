=begin
  Jekyll tag to include Markdown text from _includes directory preprocessing with Liquid.
  Usage:
    {% markdown <filename> %}
  Dependency:
    - kramdown
=end
module Jekyll
  class MarkdownTag < Liquid::Tag
    def initialize(tag_name, text, tokens)
      super
      @text = text.strip
    end
    require "kramdown"
    def render(context)
      base_dir = File.realpath(File.join(Dir.pwd, "_includes"))
      target_path = File.realpath(File.join(base_dir, @text))

      if !target_path.start_with?(base_dir + File::SEPARATOR)
        raise SecurityError, "Path traversal detected: #{@text}"
      end

      tmpl = File.read target_path
      site = context.registers[:site]
      tmpl = (Liquid::Template.parse tmpl).render site.site_payload
      html = Kramdown::Document.new(tmpl).to_html
    end
  end
end
Liquid::Template.register_tag('markdown', Jekyll::MarkdownTag)
