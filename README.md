# ChatSpace DB設計
## usersテーブル
|Column|Type|Options|
|------|----|-------|
|email|string|null: false|
|password|string|null: false|
|nickname|string|null: false|
### Association
- has_many :message
- has_many :group

## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|body|text|null:false|
|image|string||
|group_id|integer|null:false,foreign_key: true|
|user_id|integer|null:false,foreign_key: true|
### Association
- belongs_to:user

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null:false|
|user_invitable|string|null:false,foreign_key: true|
|user_id|integer||null:false,foreign_key: true|
### Association
- has_many :message
- has_many :user

## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user