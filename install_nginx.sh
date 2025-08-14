#! /bin/bash


set -e  # Exit on any error

echo "starting nginx installation"
echo "updating package list"
apt pdate

echo "Installing nginx"
apt instlal -y nginx
systemctl start nginx
systemctl enable nginx