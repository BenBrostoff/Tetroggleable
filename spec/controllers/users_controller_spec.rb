require 'rails_helper'

describe UsersController do 
	let!(:user) { User.create!(username: "stephen", email:"stephen@gmail.com", password:"password") }
	let!(:game) { Game.create(score: 10, scrabble_score: 150, level: 2, lines: 5, user_id: 1) }

		describe "GET #show" do 
			it "assigns user to current user" do 
				get :show, id: user 
				controller.stub(:current_user).and_return(:user)
			end
		end

		describe "GET #new" do 
			it "initializes a new instance of user" do 
				get :new, id: user 
				expect(assigns(:user)).to be_a User
			end
		end

		describe "POST #create" do 
			context "when valids params are passed" do 
				it "creates a new user" do 
					expect do 
						post :create, user: FactoryGirl.attributes_for(:user)
						end.to change(User, :count).by(1)
				end

			it "redirects to new game route" do 
				post :create, user: FactoryGirl.attributes_for(:user)
				expect(response.status).to redirect_to(new_game_path)
			end
		end
		context "when invalid params are passed" do 
		 	it "does not save user" do 
		 		expect do
		 			post :create, user: FactoryGirl.attributes_for(:invalid_user)
		 			end.to_not change(User, :count)
		 		end
		 	end

		 	it "redirects to new user" do 
		 		post :create, user: FactoryGirl.attributes_for(:invalid_user)
		 		expect(response).to render_template :new
		 	end
		end
	end






