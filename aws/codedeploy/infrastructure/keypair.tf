resource "tls_private_key" "this" {
  algorithm = "RSA"
}

module "key_pair" {
  source = "terraform-aws-modules/key-pair/aws"
  version = "1.0.0"

  key_name   = "deployer-one"
  public_key = tls_private_key.this.public_key_openssh
}