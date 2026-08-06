require "spec_helper"
require "jekyll"
require_relative "../../_plugins/markdown.rb"

RSpec.describe Jekyll::MarkdownTag do
  let(:site) { instance_double("Jekyll::Site", site_payload: { "site" => {} }) }
  let(:context) { instance_double("Liquid::Context", registers: { site: site }) }

  before do
    # Create a dummy Liquid template to test rendering
    # The plugin reads the file from `_includes`, so we will mock `File.read`
    allow(File).to receive(:read).and_call_original
  end

  describe "#render" do
    let(:tag_name) { "markdown" }
    let(:tokens) { Liquid::ParseContext.new }

    context "when rendering simple markdown" do
      let(:text) { "test_simple.md" }
      let(:tag) { described_class.parse(tag_name, text, tokens, Liquid::ParseContext.new) }

      before do
        allow(File).to receive(:read).with(File.join(Dir.pwd, "_includes", "test_simple.md")).and_return("# Hello World\n\nThis is a *test*.")
      end

      it "renders HTML correctly" do
        output = tag.render(context)
        expect(output).to include("<h1 id=\"hello-world\">Hello World</h1>")
        expect(output).to include("<p>This is a <em>test</em>.</p>")
      end
    end

    context "when rendering markdown with liquid tags" do
      let(:text) { "test_liquid.md" }
      let(:tag) { described_class.parse(tag_name, text, tokens, Liquid::ParseContext.new) }
      let(:site_payload) { { "site" => { "title" => "My Awesome Site" } } }

      before do
        allow(site).to receive(:site_payload).and_return(site_payload)
        allow(File).to receive(:read).with(File.join(Dir.pwd, "_includes", "test_liquid.md")).and_return("Welcome to {{ site.title }}!")
      end

      it "evaluates liquid tags before rendering markdown" do
        output = tag.render(context)
        expect(output).to include("<p>Welcome to My Awesome Site!</p>")
      end
    end

    context "when the file is not found" do
      let(:text) { "nonexistent.md" }
      let(:tag) { described_class.parse(tag_name, text, tokens, Liquid::ParseContext.new) }

      before do
        allow(File).to receive(:read).with(File.join(Dir.pwd, "_includes", "nonexistent.md")).and_raise(Errno::ENOENT)
      end

      it "raises an Errno::ENOENT error" do
        expect { tag.render(context) }.to raise_error(Errno::ENOENT)
      end
    end
  end
end
