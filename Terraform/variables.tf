variable "aws_region" {
  description = "The AWS region to deploy in"
  default     = "us-east-1"
}

variable "private_key_path" {
  description = "Path to the private key file"
  type        = string
}