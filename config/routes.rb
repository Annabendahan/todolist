Rails.application.routes.draw do


  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)

  scope '/api' do
    post 'user_token' => 'user_token#create'
    post '/users' => 'users#create'
    resources :users
    resources :status
    resources :courses
  end
end
